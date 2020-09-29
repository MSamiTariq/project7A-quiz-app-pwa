import React, { useState, useEffect, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { Difficulty, fetchQuizCategories } from '../API';
import Loading from '../Loading';
import Page from './Page';

type categoryArray = {
  id: number;
  name: string;
};

type state = {
  number: number,
  category: number,
  difficulty: Difficulty,
}

export var gState: state = {
  number: 10,
  category: 9,
  difficulty: Difficulty.EASY,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '80%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UserData: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    number: 10,
    category: 9,
    difficulty: Difficulty.EASY,
  });
  const [sam, setSam] = React.useState(true);

  const handleChange = (event: any) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  function setgState() {
    gState = state;
    setSam(false);
  }

  const [categories, setCategories] = useState<categoryArray[]>([]);
  const [loading, setLoading] = useState(false);
  async function fetchCategory() {
    setLoading(true);
    const data = await fetchQuizCategories();
    setCategories(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchCategory();
  }, [])

  if (loading) {
    return <Loading />
  }
  else {
    if (sam) {
      return (
        <div>
          <h1>User Data</h1>
          <FormControl className={classes.formControl}>
            <NativeSelect
              className={classes.selectEmpty}
              value={state.number}
              name="number"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'age' }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </NativeSelect>
            <FormHelperText>Number of Questions</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <NativeSelect
              className={classes.selectEmpty}
              value={state.category}
              name="category"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'age' }}
            >
              {categories.map((category: categoryArray, index: any) => {
                return (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </NativeSelect>
            <FormHelperText>Category</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <NativeSelect
              className={classes.selectEmpty}
              value={state.difficulty}
              name="difficulty"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'age' }}
            >
              <option value={Difficulty.EASY}>Easy</option>
              <option value={Difficulty.MEDIUM}>Medium</option>
              <option value={Difficulty.HARD}>Hard</option>
            </NativeSelect>
            <FormHelperText>Difficulty</FormHelperText>
          </FormControl>

          <Button onClick={setgState} variant="contained" color="primary" style={{ display: 'block', margin: 'auto', width: '81%', marginTop: '10px', background: '#94b9eb' }}>
            Submit
        </Button>
        </div>
      )
    }
    else {
      return (
          <Page />
      )
    }
  }
}

export default UserData;