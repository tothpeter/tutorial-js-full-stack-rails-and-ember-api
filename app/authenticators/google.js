import Ember from 'ember';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import ENV from 'relationship/config/environment';

export default ToriiAuthenticator.extend({
  torii: Ember.inject.service(),
  ajax: Ember.inject.service(),

  authenticate(...args) {

    return new Ember.RSVP.Promise((resolve, reject) => {
      this._super(...args).then(
        googleResponse => {
          return this.get('ajax').post(ENV.apiHost + '/authorization', {
            data: {
              grant_type: 'google_auth_code',
              authorization_code: googleResponse.authorizationCode
            }
          }).then(
            APIResponse => {
              resolve({
                provider: googleResponse.provider,
                access_token: APIResponse.token,
                email: APIResponse.email
              });
            },
            response => {
              reject(response);
            }
          );
        },
        response => {
          reject(response);
        }
      );
    });

  }
});
