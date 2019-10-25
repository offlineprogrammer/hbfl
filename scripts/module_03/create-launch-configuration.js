const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1'})

// Declare local variables
const autoScaling = new AWS.AutoScaling()

const lcName = 'hamsterLC'
const roleName = 'hamsterLCRole1'
const sgName = 'hamster_sg4'
const keyName = 'hamster_key4'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(data => console.log(data))

function createLaunchConfiguration (lcName, profileArn) {
  const params = {
    IamInstanceProfile: profileArn,
    ImageId: 'ami-08fa4a7f86b77b7d6',
    InstanceType: 't2.micro',
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [
      sgName
    ],
    UserData: 'IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9yeWFubXVyYWthbWkvaGJmbC5naXQKY2QgaGJmbApzdWRvIG5wbSBpCnN1ZG8gbnBtIHJ1biBzdGFydA=='

  }
  return new Promise((resolve, reject) => {
    autoScaling.createLaunchConfiguration(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
