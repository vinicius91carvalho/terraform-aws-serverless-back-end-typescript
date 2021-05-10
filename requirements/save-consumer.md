# Save a customer

> ## Success case

* ✅ Receive a request of type **PUT** in the route **/api/customers**
* ✅ Validations
    * ✅ Schema fields
        * ✅ id [optional, check if it's a valid UUID]
        * ✅ fullName [required, string, min: 3, max: 255]
        * ✅ email [required, string, check if it's a valid e-mail]
        * ✅ gender [required, enum, value: (MALE, FEMALE or OTHERS)]
        * ✅ birthDate [required, date]
* ✅ If the e-mail already exists, update info and updatedAt.
* ✅ If the e-mail not exists, create a new customer and fill createdAt.
* ✅ Returns **200** with the created customer data

> ## Exception cases

* ✅ Returns error **400** if any schema validation fail
* ✅ Returns error **403** if e-mail is in use
* ✅ Returns error **500** if an unknown error occurred