# List customers

> ## Success case

* ⛔️ Receive a request of type **GET** in the route **/api/customers/search?textToSearch={textToSearch}&limit={limit}&offset={offset}**
* ⛔️ Validations
    * ⛔️ Schema fields
        * ⛔️ textToSearch needs to be a string (min: 1, max: 100)
        * ⛔️ limit needs to be a number (min: 1, max: 1000)
        * ⛔️ offset needs to be a number (min: 0)
* ⛔️ It needs to apply free text search on all fields using the query param {textToSearch}
* ⛔️ Returns **200** with a list of customers found

> ## Exception cases

* ⛔️ Returns **204** if the list is empty
* ⛔️ Returns error **400** if any schema validation fail
* ⛔️ Returns error **500** if an unknown error occurred