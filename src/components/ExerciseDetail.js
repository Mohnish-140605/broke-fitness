import React from "react";

const ExerciseDetail = ({ exercise, closeDetail }) => {
  return (
    <div className="exercise-detail">
      <div className="exercise-detail-content">
        <button onClick={closeDetail}>Close</button>
        <h2>{exercise.name}</h2>
        <img src={exercise.gifUrl} alt={exercise.name} />
        <p><strong>Target:</strong> {exercise.target}</p>
        <p><strong>Equipment:</strong> {exercise.equipment}</p>
        <p><strong>Category:</strong> {exercise.bodyPart}</p>
        <p>{exercise.instructions}</p>
      </div>
    </div>
  );
};

export default ExerciseDetail;
