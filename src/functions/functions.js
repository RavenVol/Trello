export const calculateNewId = (object) => {
  let maxId = 0;

  for (let key in object) {
    maxId = object[key].id > maxId
      ? object[key].id
      : maxId;
  }

  return maxId + 1;
}



