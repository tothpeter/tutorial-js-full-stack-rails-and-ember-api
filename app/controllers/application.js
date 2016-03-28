import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    login() {
      this.get('session').authenticate('authenticator:google', 'google');
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
