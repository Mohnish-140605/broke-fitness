import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./components/Header";
import ExerciseCard from "./components/ExerciseCard";
import ExerciseDetail from "./components/ExerciseDetail";
import "./styles.css";

const App = () => {
  const [muscleGroup, setMuscleGroup] = useState("chest");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/ ${muscleGroup}`,
        {
          headers: {
            "X-RapidAPI-Key": "7a984bc490mshe428653f32d4137p1126a7jsn6e4347bcd9cd", 
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExercises();
  }, [muscleGroup]);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (exercise) => {
    const isFavorite = favorites.some((fav) => fav.id === exercise.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== exercise.id));
    } else {
      setFavorites([...favorites, exercise]);
    }
  };

  const muscleGroups = ["chest", "back", "arms", "legs", "shoulders", "abs"];

  return (
    <div className="app">
      <Header />

      <div className="muscle-group-buttons">
        {muscleGroups.map((group) => (
          <motion.button
            key={group}
            onClick={() => setMuscleGroup(group)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={group === muscleGroup ? "active" : ""}
          >
            {group.toUpperCase()}
          </motion.button>
        ))}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="favorites-button">
        <motion.button
          onClick={() => setShowFavorites(!showFavorites)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showFavorites ? "Show All Exercises" : `Show Favorites (${favorites.length})`}
        </motion.button>
      </div>

      <main>
        {loading ? (
          <motion.div
            className="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading exercises...
          </motion.div>
        ) : (
          <div className="exercise-list">
            {showFavorites
              ? favorites.length > 0
                ? favorites.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      toggleFavorite={toggleFavorite}
                      isFavorite={true}
                      onClick={() => setSelectedExercise(exercise)}
                    />
                  ))
                : "No favorite exercises yet!"
              : filteredExercises.length > 0
              ? filteredExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    toggleFavorite={toggleFavorite}
                    isFavorite={favorites.some((fav) => fav.id === exercise.id)}
                    onClick={() => setSelectedExercise(exercise)}
                  />
                ))
              : "No exercises found."}
          </div>
        )}
      </main>

      {selectedExercise && (
        <ExerciseDetail
          exercise={selectedExercise}
          closeDetail={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
};

export default App;


//this is being changed for pushing it again to the github repo