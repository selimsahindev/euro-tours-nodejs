const Roles = {
  User: 'user',
  Guide: 'guide',
  LeadGuide: 'lead-guide',
  Admin: 'admin',
};

const getValues = () => Object.values(Roles);

module.exports = { Roles, getValues };
