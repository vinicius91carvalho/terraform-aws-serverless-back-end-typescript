'use strict'

import algoliasearch from 'algoliasearch'

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function prepareCustomerForAlgolia (streamCustomer) {
  return {
    birthDate: streamCustomer.birthDate.S,
    createdAt: streamCustomer.createdAt.S,
    email: streamCustomer.email.S,
    fullName: streamCustomer.fullName.S,
    gender: streamCustomer.gender.S,
    id: streamCustomer.id.S,
    objectID: streamCustomer.id.S
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addCustomer = async streamCustomer => {
  const customer = prepareCustomerForAlgolia(streamCustomer)
  await index.saveObject(customer)
  console.log('Saved data on Algolia: ', customer)
}

export const handler = async (event): Promise<any> => {
  console.log(JSON.stringify(event))
  const eventData = event.Records[0]
  if (eventData.eventName === 'REMOVE') {
    const id = eventData.dynamodb.Keys.id.S
    await index.deleteObject(id)
    console.log('ID removed on Algolia: ', id)
  } else {
    const customer = eventData.dynamodb.NewImage
    try {
      await addCustomer(customer)
    } catch (error) {
      console.error(error)
    }
  }
}
