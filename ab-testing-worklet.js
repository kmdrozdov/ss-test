class SelectURLOperation {
  async run(urls, data) {
    return this.sharedStorage.get('ab-testing-group');
  }
}

register('ab-testing', SelectURLOperation);
