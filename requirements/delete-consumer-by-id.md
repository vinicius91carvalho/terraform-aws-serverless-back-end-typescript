# Delete a consumer by ID

> ## Success case

* ⛔️ Receive a request of type **DELETE** in the route **/api/consumers/{consumerId}**
* ⛔️ Validations
    * ⛔️ Schema fields
        * ⛔️ consumerId needs to be a valid UUID
* ⛔️ Returns **204** with deleted consumer

> ## Exception cases

* ⛔️ Returns **404** if the consumer doesn't exist
* ⛔️ Returns error **400** if any schema validation fail
* ⛔️ Returns error **500** if an unknown error occurred