{
  id: "name",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      name: {type: "string"},
      age: {type: "number"},
      type: {type: "string"},
      owners: {type: "array", items: {type: "string"}},
      description: {type: "string"},
    }
  },
  attachments: {
    description: {
      extension: 'md'
    }
  },
  access: {
    get: "all",
    post: "all",
    "patch|put": function(pet, owner) {
      return owner.admin || pet.owners.indexOf(owner.id) !== -1;
    },
  },
  middleware: {
    get: function(pet) {
      var self = this;
      pet.owners = pet.owners.map(function(owner) {
        owner = self.collections.owners.get(owner);
        return {id: owner.id, name: owner.name};
      });
      return pet;
    },
    'post|put': function(pet) {
      pet.type = pet.type || "unknown";
      if (this.variables.allowedTypes.indexOf(pet.type) === -1) throw new Error("Type " + pet.type + " not allowed");
      return pet;
    },
  },
  variables: {
    allowedTypes: ["cat", "dog", "unknown"]
  },
}
