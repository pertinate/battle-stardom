import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const myList = [
    'this'
];

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                }
            },
            getMyList: {
                type: new GraphQLList(GraphQLString),
                resolve() {
                    return myList;
                }
            }
        }
    })
});

export default schema;
