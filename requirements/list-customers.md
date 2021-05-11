# List customers

> ## Success case

* ⛔️ Receive a request of type **GET** in the route **/api/customers?limit={limit}&lastIdOffset={lastIdOffset}**
* ⛔️ Validations
    * ⛔️ Schema fields
        * ⛔️ limit needs to be a number (min: 1, max: 1000)
        * ⛔️ lastIdOffset needs to be a number (min: 0)
* ⛔️ Returns **200** with a list of customers found

> ## Exception cases

* ⛔️ Returns **204** if the list is empty
* ⛔️ Returns error **400** if any schema validation fail
* ⛔️ Returns error **500** if an unknown error occurred