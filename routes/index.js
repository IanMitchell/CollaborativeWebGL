
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Collaborative WebGL Scene Editor' });
};