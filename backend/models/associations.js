const Organisations = require('./organisations');
const Users = require('./users');
const Employees = require('./employees');
const Teams = require('./teams');
const EmployeeTeams = require('./employee_teams');
const Logs = require('./logs');
// Organisation ↔ Users
Organisations.hasMany(Users, { foreignKey: 'organisation_id' });
Users.belongsTo(Organisations, { foreignKey: 'organisation_id' });
// Organisation ↔ Employees
Organisations.hasMany(Employees, { foreignKey: 'organisation_id' });
Employees.belongsTo(Organisations, { foreignKey: 'organisation_id' });
// Organisation ↔ Teams
Organisations.hasMany(Teams, { foreignKey: 'organisation_id' });
Teams.belongsTo(Organisations, { foreignKey: 'organisation_id' });
// Employees ↔ Teams (Many-to-Many)
Employees.belongsToMany(Teams, { through: EmployeeTeams, foreignKey: 'employee_id', otherKey: 'team_id' });
Teams.belongsToMany(Employees, { through: EmployeeTeams, foreignKey: 'team_id', otherKey: 'employee_id' });
// Logs ↔ Organisation + User
Logs.belongsTo(Organisations, { foreignKey: 'organisation_id' });
Logs.belongsTo(Users, { foreignKey: 'user_id' });
module.exports = {
  Organisations,
  Users,
  Employees,
  Teams,
  EmployeeTeams,
  Logs
};
