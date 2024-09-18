
const insertMany = async (Model, data) => {
    return Model.insertMany([data]);
  };
  
  const find = async (Model, query = {}, type = 'find') => {
    if (type === 'find') {
      return Model.find(query);
    } else if (type === 'findById') {
      return Model.findById(query);
    } else if (type === 'findOne') {
      return Model.findOne(query);
    } else {
      throw new Error('Invalid find type');
    }
  };
  
  
  const update = async (Model, query, updateData) => {
    return Model.updateOne(query, updateData);
  };
  
  const deleteOne = async (Model, query) => {
    return Model.deleteOne(query);
  };
  
  module.exports = { insertMany, find, update, deleteOne };
  