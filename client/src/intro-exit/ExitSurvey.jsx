import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";

export function ExitSurvey({ next }) {
  const labelClassName = "block text-sm font-medium text-gray-700 my-2";
  const inputClassName =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm";
  const player = usePlayer();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [strength, setStrength] = useState("");
  const [fair, setFair] = useState("");
  const [feedback, setFeedback] = useState("");
  const [education, setEducation] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    player.set("exitSurvey", {
      age,
      gender,
      strength,
      fair,
      feedback,
      education,
    });
    next();
  }

  function handleEducationChange(e) {
    setEducation(e.target.value);
  }

  return (
      <div style={{maxWidth: '800px', margin: '0 auto', padding: '2rem'}}>
        <h1>Exit Survey</h1>
        <p>Please complete the survey below before finishing.</p>

        <iframe
            src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=MH_ksn3NTkql2rGM8aQVG-tihBA1rupNjYA3OGj3xU1UQkVTTlVZNFpRV0c3UkdRNTExS1RSODJMOS4u"
            width="100%"
            height="600px"
            style={{border: 'none', borderRadius: '8px', marginBottom: '1.5rem'}}
            title="Consent Form"
        />

      </div>
  );
}

export function Radio({selected, name, value, label, onChange}) {
  return (
      <label className="text-sm font-medium text-gray-700">
        <input
            className="mr-2 shadow-sm sm:text-sm"
            type="radio"
            name={name}
            value={value}
            checked={selected === value}
            onChange={onChange}
        />
        {label}
      </label>
  );
}
