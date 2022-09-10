const userTypes = `
  id:           Int!
  email:        String
  firstName:    String 
  lastName:     String
  token:         String
  companyUsersData: [CompanyUsersData]
  role:         Int
`;

const dateTypes = `
    date:String
    count:String
`;

const orderInvoiceData = `
    id:String
    salesOrder:String
    customerPo:String
`;

export const timestampFields = `
  createdAt: DateTime
  updatedAt: DateTime
`;
export const types = `
  type User {
    ${userTypes}
  }

  type UserSignIn{
    ${userTypes}
    confirmed: Boolean
    permissions:    Permissions
  }

  type GetMePayload {
    user:           User
    permissions:    Permissions
  }
  
  type Permissions{
    canReadUsers: Boolean
    canUpdateUser: Boolean
    canDeleteUser: Boolean
    canCreateUser: Boolean
  }

  type CompanyUsersData{
    id:String
    value:String
    companyName:String
    companyId:String
    permissions: CompanyUserPermissions
  }

  type CompanyUserPermissions{
    canReadOrders:Boolean
    canReadQuotes:Boolean
    canReadInvoices:Boolean
  }

  type Orders {
    ${orderInvoiceData}
    productionOrders:String
    lines:String
  }

  type SingleOrder{
    ${orderInvoiceData}
    total: String
    POCount:String
    shipDate:String
  }

  type ProductionOrder {
    name: String
    status: String
    startDate: String
    itemCode: String
    dueDate: String
    quantity: String
    productionOrderId:String
    issuedQty:  String
    routeStagesQty: String
  }

  type OrdersByDate {
    quantity:String
    ${dateTypes}
  }

  type GetInvoicesByDate{
    ${dateTypes}
  }

  type GetInvoices{
    ${orderInvoiceData}
    deliveryDate: String
    price:String
  }

  type CompanyName{
    companyName:String
    companyId:String
  }

  type SwitchCompanies {
    companyId:String
    id:String
    companyName:String
    permissions:CompanyUserPermissions
    value:String
  }
  type TotalPrice {
    totalPrice:String
  }

  type Lines {
    itemCode:String
    description:String
    inventory:String
    availability:String
  }
`;

export const inputs = `
input signinData {
  email:    String!
  password: String!
}
input signupData{
  email:    String!
  password: String!
  firstName: String!
  lastName: String!
}
`;
