import { GraphQLServer } from 'graphql-yoga';

//type defenisions
const typeDefs = `
    type Query {
        Wine: Wine!
        Review: Review!
        Grape: Grape!
        Uuid: Uuid!
        User: User!
        Systembolaget_sortiment: Systembolaget_sortiment!
    }

    type Mutation {
        addWine(data: CreateWineInput!): Wine!

        updateWine(addWine(data: UpdateWineInput!): Wine!

        addReview(data: CreateReviewInput!): Review!
            
        updateReview(data: UpdateReviewInput!): Review!

        removeWine(id: ID!): Wine

        removeReview(id: ID!): Review

        createUser()

        killSession()

    }

    input CreateWineInput {
        year: Int!
        name: String!
        country: String!
        color: String!
        producer: String!
        boughtFrom: String!
        price: String!
        glass: Boolean!
    }

    input UpdateWineInput {
        id: Int!
        year: Int!
        name: String!
        country: String!
        color: String!
        producer: String!
        boughtFrom: String!
        price: String!
        glass: Boolean!
    }

    input CreateReviewInput {
        comment: String!
        score: Int!
        reviewer: String!
        ${/*fk_wine_id: String! */}
        added: String!
    }

    input UpdateReviewInput {
        id: Int!
        comment: String!
        score: Int!
        reviewer: String!
        ${/*fk_wine_id: String! */}
        added: String!
    }

    input CreateUserInput {
        username: String!
        name: String!
    }

    type Wine {
        id: Int!
        year: Int!
        name: String!
        country: String!
        color: String!
        producer: String!
        boughtFrom: String!
        price: String!
        glass: Boolean!
    }

    type Review {
        id: Int!
        comment: String!
        score: Int!
        reviewer: String!
        ${/*fk_wine_id: String! */}
        added: String!
    }

    type Grape {
        id: Int!
        grape: String!
        ${/*fk_wine_id: String! */}   
    }

    type User {
        id: Int!
        username: String!
        hash: String!
        name: String!
    }

    type Uuid {
        id: String!
        ${/*fk_user_id: String! */}
        uuid: String!
        ttl: Int!
        ttl_max: Int!
    }

    type Systembolaget_sortiment {
        nr: Int!
        Artilelid: Int!
        Varnummer: String!
        Namn: String!
        Namn2: String!
        Prisinklmoms: String!
        Volymiml: String!
        PrisPerLiter: String!
        Saljstart: String!
        Utgått: Boolean!
        Varugrupp: String!
        Typ: String!
        Stil: String!
        Forpackning: String!
        Forslutning: String!
        Ursprunglandnamn: String!
        Leverantor: String!
        Argang: String!
        Provadargang: String!
        Alkoholhalt: String!
        Sortiment: String!
        SotrimentText: String!
        Producent: String!
        Ekologisk: Boolean!
        Etiskt: Boolean!
        Kocher: Boolean!
        glass: Boolean!
    }
`;

//resolvers
const resolvers = {
    //READ
    Query: {
        hello() {
            return 'This is fun!';
        },
    },
    //UPDATE DELETE CREATE
    Mutation: {
        addWine(parent, args, ctx, info){

        },
        addReview(parent, args, ctx, info){

        },
        removeWine(parent, args, ctx, info){
            
        },
        removeReview(parent, args, ctx, info){

        },
        createUser(parent, args, ctx, info){

        },
        killSession(parent, args, ctx, info){

        },
    },
    Wine: {

    },
    Login: {

    },
    Keepalive: {

    }

};

const server = new GraphQLServer({
    typeDefs,
    resolvers
    }
)

server.start(() => console.log('Server is running'));
