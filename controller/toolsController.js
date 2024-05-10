let SummarizerManager = require('node-summarizer').SummarizerManager;

const getSummary = async (req, res) => {
  const { title = '', content } = req.body;
  console.log(content.length);
  let Summarizer = new SummarizerManager(content, 2);
  let summary = Summarizer.getSummaryByRank().then((summary_object) => {
    return summary_object.summary;
  });

  summary.then((result) => {
    res.send(result);
    console.log(result);
  });
};

module.exports = { getSummary };
