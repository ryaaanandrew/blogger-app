const graphql = require('graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Post = require('../models/post');
const User = require('../models/user');

const { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } = graphql;

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
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
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find()
      }   
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id)
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
          content: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
          let post = new Post({
            title: args.title,
            content: args.content
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
        }
      }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});