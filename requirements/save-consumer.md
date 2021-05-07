# Save a consumer

> ## Success case

* ⛔️ Receive a request of type **PUT** in the route **/api/consumers**
* ⛔️ Validations
    * ⛔️ Schema fields
        * ⛔️ id [optional, check if it's a valid UUID]
        * ⛔️ firstName [required, string, min: 3, max: 100]
        * ⛔️ lastName [required, string, min: 3, max: 100]
        * ⛔️ email [required, string, check if it's a valid e-mail]
        * ⛔️ gender [required, enum, value: (MALE, FEMALE or OTHERS)]
        * ⛔️ streetAddress [required, string, min: 3, max: 255]
        * ⛔️ postalCode [required, string, min: 10, max: 15]
        * ⛔️ city [required, string, min: 3, max: 100]
        * ⛔️ birthDate [required, date, min: 18 years, max: 100 years]
* ⛔️ If the e-mail already exists, update info and updatedDate.
* ⛔️ If the e-mail not exists, create a new consumer and fill createdDate.
* ⛔️ Returns **200** with the created consumer data

> ## Exception cases

* ⛔️ Returns error **400** if any schema validation fail
* ⛔️ Returns error **500** if an unknown error occurred