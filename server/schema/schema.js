const graphql = require('graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Post = require('../models/post');
const User = require('../models/user');

const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLList, 
  GraphQLNonNull , 
  GraphQLInt 
} = graphql;

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    score: { type: GraphQLInt },
    creator: {
      type: UserType,
      resolve(parent, args) {
        return User.findById( parent.creatorId );
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  })
});

const AuthData = new GraphQLObjectType({
  name: 'AuthData',
  fields: () => ({
    userId: { type: GraphQLString },
    token: { type: GraphQLString },
    expiresIn: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find();
      }   
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
    fields: {
      createPost: {
        type: PostType,
        args: {
          title: { type: new GraphQLNonNull(GraphQLString) },
          content: { type: new GraphQLNonNull(GraphQLString) },
          creatorId: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
          let post = new Post({
            title: args.title,
            content: args.content,
            creatorId: args.creatorId
          });
          return post.save();
        }
      },
      createUser: {
        type: UserType,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          username: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, args) {
          try {
            const existingUser = await User.findOne({ email: args.email });
            if(existingUser) {
              throw new Error('User already exists');
            }
            const hashedPassword = await bcrypt.hash(args.password, 12);
            let user = new User({
              email: args.email,
              username: args.username,
              password: hashedPassword
            });
            return user.save();
          } catch(err) {
            throw new Error(err)
          }
        }
      },
      login: {
        type: AuthData,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(parent, args) {
          try {
            const user = await User.findOne({ email: args.email });
            if(!user) throw new Error('User does not exist');
            const isEqual = await bcrypt.compare(args.password, user.password);
            if(!isEqual) throw new Error('Password or email is incorrect');
            const token = jwt.sign({ userId: user.username, email: user.email }, '1234567890', { expiresIn: '1h' });
            return {
              userId: user.id,
              token: token,
              expiresIn: 1
            };
          } catch(err) {
            throw new Error(err)
          }
        }
      }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});