const getExperimentGroup = () => Math.round(Math.random());

async function main() {
  await window.sharedStorage.worklet.addModule('ab-testing-worklet.js');

  window.sharedStorage.set('ab-testing-group', getExperimentGroup(), { ignoreIfPresent: true });
};

main();
