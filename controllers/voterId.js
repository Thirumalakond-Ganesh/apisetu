const jwt = require('jsonwebtoken');
const data = require('../DataVoterId.json');


exports.voteridverify = async (req, res) => {
  try {
    const { service, itemId, task, essentials } = req.body;

    if (!service || !itemId || task !== "verification" || !essentials) {
      return res.status(400).json({ error: "Missing required fields in the request body" });
    }

    const itemIdVerify = jwt.verify(itemId, process.env.JWT_SECRET);
    if (itemIdVerify.fldID === '95604') {

      const { number, fuzzy, voteridStatus } = essentials;
      console.log("true fldID");

      const isValidVoterId = (voterId) => {
        const voterIdRegex =/^[A-Z]{0,3}\d{0,7}$/;
        if (!voterIdRegex.test(voterId)) {
          return false;
        }
        return true;    
      }
      
      if (!isValidVoterId(number) || !fuzzy || !voteridStatus) {
        console.log(number);
        return res.status(400).json({ error: "Missing personal verification fields in the request body" });
      } else {
        const voterIdD = data.VoterIdData;
        const voterIdFinder = voterIdD.find(a => a.data.voter_id === number);
        if(voterIdFinder){
          console.log(voterIdFinder);
          return res.status(201).json(voterIdFinder);
        }
        else{
          return res.status(422).json({
            data: {
                client_id: "voter_id_validation_JhkjBkjbhJgvgjVGHS",
                age_range: null,
                voter_id: number,
                state: null,
                gender: null,
                remarks: "invalid_voterId_format",
                Address: null
            },
            status_code: 422,
            success: false,
            message: "Verification Failed.",
            message_code: "verification_failed"
          });
        }
     
      }
    } else {
      return res.status(500).json({ error: "Not Valid details" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
