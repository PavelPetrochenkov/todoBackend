const usersList = [
	{id:'1', email:'123@123.123', password:'123123'},
	{id:'2', email:'qw@qw.qw', password:'123123'},
	{id:'3', email:'pavel@gmail.com', password:'123123'},
]

exports.userLogin = (ctx) => {
	const userEmail = ctx.request.body.email;
	const userPassword = ctx.request.body.password;
	if(!!usersList.find((user)=> (user.email === userEmail 
	&& user.password === userPassword))){
		ctx.response.status=200;
		ctx.body = {message:'ok'}
	} else {
		ctx.response.status=401;
		ctx.body = {error:'User not found'}
	}
}
