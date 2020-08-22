import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import SearchBarForm from "./SearchBarForm";

interface Props extends RouteComponentProps<any> {}

const SearchBar: React.FC<Props> = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          display: "inline-block",
          marginTop: "10vh",
        }}
      >
        <Card
          style={{
            display: "grid",
            borderRadius: "32px",
            maxWidth: "70vw",
            minHeight: "7vh",
          }}
          className="search"
          variant="outlined"
        >
          <CardContent
            style={{
              display: "flex",
              placeItems: "center",
              padding: 0,
            }}
          >
            <SearchBarForm
              errors=""
              location={props.location}
              history={props.history}
              match={props.match}
              onSubmit={(values) => {
                // Call helper function that formats the date with the hyphens instead of slashes
                let checkInDate: string = formatDateToLocalDate(
                  values.checkInDate
                );
                let checkOutDate: string = formatDateToLocalDate(
                  values.checkOutDate
                );

                // Redirect to search route
                props.history.push(`/search?location=${values.location}&checkIn=${checkInDate}&checkOut=${checkOutDate}`)
              }}
            />
          </CardContent>
        </Card>
      </div>
    </MuiPickersUtilsProvider>
  );
};

function formatDateToLocalDate(input: Date): string {
  return input.toISOString().split('T')[0]
}

export default SearchBar;
