"use strict";

function greeter(person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

var user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
//# sourceMappingURL=greeter3.js.map
