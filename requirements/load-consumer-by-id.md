# Load a customer by ID

> ## Success case

* ✅ Receive a request of type **GET** in the route **/api/customers/{customerId}**
* ✅ Validations
    * ✅ Schema fields
        * ✅ customerId [required, check if it's a valid UUID]
* ✅ Returns **200** with customer found

> ## Exception cases

* ✅ Returns **204** if a customer with the informed id doesn't exist
* ✅ Returns error **400** if any schema validation fail
* ✅ Returns error **500** if an unknown error occurred