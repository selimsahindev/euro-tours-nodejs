const Roles = {
  User: 'user',
  Guide: 'guide',
  LeadGuide: 'lead-guide',
  Admin: 'admin',
};

const getRoleValues = () => Object.values(Roles);

module.exports = { Roles, getRoleValues };
