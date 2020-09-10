class DataStore {
  constructor(client) {
    this.client = client;
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.client.get('todo', (err, res) => {
        if (err) reject(err);
        resolve(JSON.parse(res));
      })
    })
  }

  saveData(todo) {
    return new Promise((resolve, reject) => {
      this.client.set('todo', JSON.stringify(todo), (err, _res) => {
        if (err) reject(err);
        resolve(true);
      })
    })
  }
}

module.exports = { DataStore };