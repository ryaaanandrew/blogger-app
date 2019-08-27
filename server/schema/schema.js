const graphql = require('graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLList, 
  GraphQLNonNull , 
  GraphQLInt,
} = graphql;

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    score: { type: GraphQLInt },
    comments: { type: new GraphQLList(CommentType)},
    creator: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.creatorId);
      }
    }
  })
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    postId: { type: GraphQLString },
    comment: { type: GraphQLString },
    creatorId: { type: GraphQLString },
    creator: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.creatorId)
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
      async resolve(parent, args) {
        try {
          return Post.find();
        } catch(err) {
          throw new Error(err);
        }
      }   
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return Post.findById(args.id);
        } catch(err) {
          throw new Error(err);
        }
      }
    },
    fetchComments: {
      type: new GraphQLList(CommentType),
      args: { postId: { type: GraphQLID }},
      async resolve(parent, args) {
        try {
          return Post.findById(args.postId).distinct("comments");
        } catch(err) {
          throw new Error(err);
        }
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
      addComment: {
        type: CommentType,
        args: {
          postId: { type: new GraphQLNonNull(GraphQLID) },
          creatorId: { type: new GraphQLNonNull(GraphQLID) },
          comment: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve (parent, args) {
          const oldResults = await Post.findById(args.postId);
          const newComment = new Comment({
            postId: args.postId,
            creatorId: args.creatorId,
            comment: args.comment
          });
          return results = await Post.findByIdAndUpdate(args.postId, {
            $set: { comments: [ ...oldResults.comments, newComment] }
          }, {new: true} );
        }
      },
      updateScore: {
        type: PostType,
        args: {
          postId: { type: new GraphQLNonNull(GraphQLID) },
          score: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve(parent, args){
          return Post.findByIdAndUpdate(args.postId, { $set: { score: args.score } }, {new: true});
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