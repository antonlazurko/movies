import React, { useState } from "react";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "40px",
    },
    searchBar: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

type TProps = {
  onSearchbarSubmit: (searchQuery: string) => void;
};
export default function Searchbar({ onSearchbarSubmit }: TProps) {
  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState("");
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (searchQuery.trim() === "") {
      toast("Type something to find.");
      return;
    }
    onSearchbarSubmit(searchQuery.toLowerCase());
    setSearchQuery("");
  };
  return (
    <div className={classes.searchBar}>
      <form
        className={classes.root}
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <Input
          placeholder="Search movies"
          inputProps={{ "aria-label": "description" }}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
