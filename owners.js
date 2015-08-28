{
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      name: {type: "string"},
      password: {type: "string"},
    }
  },
  access: {
    get: "all",
    post: "all",
    "patch|put": function(owner, user) {
      return user.admin || user.id === owner.id;
    },
  },
  middleware: {
    get: function(owner) {
      owner.pets = this.collections.pets.get().filter(function(pet) {
        return pet.owners.indexOf(owner.id) !== -1;
      })
      delete owner.password;
      return owner;
    },
    'post|put': function(owner) {
      if (!owner.password) throw new Error("Password must be specified");
      owner.password = this.utils.hash(owner.password);
    }
  }
}
