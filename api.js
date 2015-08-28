{
  authentication: {
    userCollection: "owners",
    strategies: {
      api_key: {
        name: "api_key",
        in: "header",
      },
      password: function(request, owners) {
        var creds = request.headers.Authorization.substring(6);
        if (!creds) return null;
        creds = creds.split(':');
        var username = creds[0];
        var password = Utils.hash(creds[1]);
        return owners.filter(function(owner) {
          return owner.id === creds[0] && owner.password === password;
        })[0]
      }
    }
  }
}
