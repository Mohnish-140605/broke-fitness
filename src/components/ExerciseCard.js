import React from "react";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise, toggleFavorite, isFavorite, onClick }) => {
  return (
    <motion.div
      className="exercise-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <img src={exercise.gifUrl} alt={exercise.name} />
      <h3>{exercise.name}</h3>
      <p>Target: {exercise.target}</p>
      <p>
        <strong>Sets:</strong> {exercise.sets || "3"} | <strong>Reps:</strong> {exercise.reps || "12"}
      </p>
      <button
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation(); 
          toggleFavorite(exercise);
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </motion.div>
  );
};

export default ExerciseCard;
