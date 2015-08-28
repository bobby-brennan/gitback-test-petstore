{
  authentication: {
    userCollection: "owners",
    strategies: {
      api_key: {
        name: "api_key",
        in: "header",
      },
      password: function(req, owners) {
        var creds = req.get('Authorization');
        if (!creds) return null;
        creds = creds.substring(6);
        creds = creds.split(':');
        var username = creds[0];
        var password = this.utils.hash(creds[1]);
        return owners.filter(function(owner) {
          return owner.id === creds[0] && owner.password === password;
        })[0]
      }
    }
  }
}
