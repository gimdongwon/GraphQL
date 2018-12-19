import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { USERS } from "./API/graphQL/query/USERS";
import { ADD_USER } from "./API/graphQL/mutation/ADDUSER";
import Loading from "./assets/Loading";
import { REMOVE_USER } from "./API/graphQL/mutation/REMOVEUSER";
import { UPDATE_USER } from "./API/graphQL/mutation/UPDATEUSER";
class App extends Component {
  state = {
    text: "",
    changeMode: false,
    changeText: ""
  };

  handleTextEdit = e => {
    this.setState({
      text: e.target.value
    });
  };
  changeMode = e => {
    this.setState({
      changeMode: !this.state.changeMode,
      text: e.target.textContent,
      changeText: e.target.textContent
    });
  };
  afterUpdate = e => {
    this.setState({
      changeMode: !this.state.changeMode
    });
  };

  render() {
    return (
      <div className="App" style={{ margin: "20px" }}>
        <h1>스터디용 투두 리스트</h1>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            onChange={e => this.handleTextEdit(e)}
            value={this.state.text}
          />

          {this.state.changeMode === false ? (
            <Mutation
              mutation={ADD_USER}
              variables={{ name: this.state.text }}
              refetchQueries={[{ query: USERS }]}
            >
              {(addUser, { data }) => {
                return <button onClick={addUser}>등록</button>;
              }}
            </Mutation>
          ) : (
            <Query query={USERS}>
              {({ data }) => {
                return data.users.map(item =>
                  item.name === this.state.changeText ? (
                    <React.Fragment key={item.id}>
                      <Mutation
                        mutation={UPDATE_USER}
                        variables={{
                          id: item.id,
                          name: this.state.text
                        }}
                        refetchQueries={[{ query: USERS }]}
                      >
                        {updateUser => {
                          return (
                            <button
                              onClick={updateUser}
                              onClickCapture={this.afterUpdate}
                            >
                              수정
                            </button>
                          );
                        }}
                      </Mutation>
                    </React.Fragment>
                  ) : (
                    ""
                  )
                );
              }}
            </Query>
          )}
          <div>변경하려면 해당 글을 선택하세요</div>
        </div>
        <Query query={USERS}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) console.error(error);
            if (data) console.log(data.users);
            return data.users.map(item => (
              <React.Fragment key={item.id}>
                <div style={{ marginTop: "5px", display: "flex" }}>
                  <li onClick={e => this.changeMode(e)}>{item.name}</li>
                  <Mutation
                    mutation={REMOVE_USER}
                    variables={{ id: item.id }}
                    refetchQueries={[{ query: USERS }]}
                  >
                    {removeUser => {
                      return (
                        <button type="submit" onClick={removeUser}>
                          삭제
                        </button>
                      );
                    }}
                  </Mutation>
                </div>
              </React.Fragment>
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default App;
