const auten = (req, res, next) => {
  const { authorization } = req.headers;
    
  if (!authorization || authorization.length !== 16) {
    return res.status(401)
      .json({ message: !authorization ? 'Token não encontrado' : 'Token inválido' });
  }
  
  next();
};
  
module.exports = auten;
