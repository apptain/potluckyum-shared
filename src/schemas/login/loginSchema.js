export default () => {
  return {
    type: 'object',
    title: 'Login',
    required: ['username', 'password'],
    properties: {
      username: {
        title: 'User Name',
        type: 'string'
      },
      password: {
        title: 'Password',
        type: 'string'
      }
    }
  }
}