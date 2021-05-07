# Load a consumer by ID

> ## Success case

* ⛔️ Receive a request of type **GET** in the route **/api/consumers/{consumerId}**
* ⛔️ Validations
    * ⛔️ Schema fields
        * ⛔️ consumerId [required, check if it's a valid UUID]
* ⛔️ Returns **200** with consumer found

> ## Exception cases

* ⛔️ Returns **204** if a consumer with the informed id doesn't exist
* ⛔️ Returns error **400** if any schema validation fail
* ⛔️ Returns error **500** if an unknown error occurred