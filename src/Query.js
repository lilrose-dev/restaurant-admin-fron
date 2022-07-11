import {gql} from '@apollo/client'

//category
const CATEGORY = gql`
query{
    categories{
        id
        name
    }
}
`

const NEW_CATEGORY = gql`
    mutation newCategory($name: String!){
        newCategory(name: $name){
            id
            name
        }
    }

`

const DEL_CATEGORY = gql`
    mutation delCategory($id: ID!){
        delCategory(id: $id)
    }
`


const EDIT_CATEGORY = gql`
    mutation updateCategory($name: String! $id: ID!){
        updateCategory(name: $name id: $id){
            id
            name
        }
    }
`

const RESTAURANT = gql`
    query{
        restaurants{
            id
            name
            catID
        }
    }
`

const EDIT_RES = gql`
    mutation updateRestaurant($name: String! $id: ID!){
        updateRestaurant(name: $name, id: $id){
            id
            name
        }
    }
`

const NEW_RESTAURANT = gql`
    mutation newRestaurant($name: String! $catID: ID!){
        newRestaurant(name: $name, catID: $catID){
            id
            name
            catID
        }
    }
`

const DEL_RESTAURANT = gql`
    mutation delRestaurant($id: ID!){
        delRestaurant(id: $id)
    }
`

const BRANCH = gql`
    query{
        branches{
            id
            name
            resID
        }
    }
`


const NEW_BRANCH = gql`
    mutation newBranch($name: String! $resID: ID!){
        newBranch(name: $name, resID: $resID){
            id
            name
            resID
        }
    }
`

const DEL_BRANCH = gql`
    mutation delBranch($id: ID!){
        delBranch(id: $id)
    }
`

const EDIT_BRANCH = gql`
    mutation updateBranch($name: String! $id: ID!){
        updateBranch(name: $name, id: $id){
            id
            name
        }
    }
`

const FOOD = gql`
    query{
        food{
            id
            name
            branchID
            price
        }
    }
`

const NEW_FOOD = gql`
    mutation newFood($name: String! $branchID: ID! $price: Int!){
        newFood(name: $name, branchID: $branchID, price: $price){
            id
            name
            branchID
            price
        }
    }
`

const DEL_FOOD = gql`
    mutation delFood($id: ID!){
        delFood(id: $id)
    }
`

const EDIT_FOOD = gql`
    mutation updateFood($name: String! $price: Int! $id: ID!){
        updateFood(name: $name, price: $price, id: $id)
    }
`

const ORDER = gql`
    query{
        orders{
            id
            userName
            location
            phone
            foodName
            price
            count
        }
    }
`
const DEL_ORDER = gql`
    mutation delOrder($id: ID!){
        delOrder(id: $id)
    }
`


export{
    CATEGORY,
    NEW_CATEGORY,
    EDIT_CATEGORY,
    DEL_CATEGORY,
    RESTAURANT,
    NEW_RESTAURANT,
    EDIT_RES,
    DEL_RESTAURANT,
    BRANCH,
    NEW_BRANCH,
    EDIT_BRANCH,
    DEL_BRANCH,
    FOOD,
    DEL_FOOD,
    NEW_FOOD,
    EDIT_FOOD,
    ORDER,
    DEL_ORDER
}