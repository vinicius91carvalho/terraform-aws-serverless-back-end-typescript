# Delete a customer by ID

> ## Success case

* ⛔️ Receive a request of type **DELETE** in the route **/api/customers/{customerId}**
* ⛔️ Validations
    * ⛔️ Schema fields
        * ⛔️ customerId needs to be a valid UUID
* ⛔️ Returns **204** with deleted customer

> ## Exception cases

* ⛔️ Returns **404** if the customer doesn't exist
* ⛔️ Returns error **400** if any schema validation fail
* ⛔️ Returns error **500** if an unknown error occurred