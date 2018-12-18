import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { USERS } from "./API/graphQL/query/USERS";
import { ADD_USER } from "./API/graphQL/mutation/ADDUSER";
import Loading from "./assets/Loading";
import { REMOVE_USER } from "./API/graphQL/mutation/REMOVEUSER";
import { UPDATE_USER } from "./API/graphQL/mutation/UPDATEUSER";
class App extends Component {
  state = {
    text: ""
  };

  handleTextEdit = e => {
    this.setState({
      text: e.target.value
    });
  };

  render() {
    return (
      <div className="App" style={{ margin: "20px" }}>
        <h1>스터디용 투두 리스트</h1>
        <div style={{ display: "flex" }}>
          <input type="text" onChange={e => this.handleTextEdit(e)} />
          <Mutation
            mutation={ADD_USER}
            variables={{ name: this.state.text }}
            refetchQueries={[{ query: USERS }]}
          >
            {(addUser, { data }) => {
              return <button onClick={addUser}>등록</button>;
            }}
          </Mutation>
        </div>
        <Query query={USERS}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) console.error(error);
            if (data) console.log(data);
            return data.users.map(item => (
              <React.Fragment key={item.id}>
                <div style={{ marginTop: "5px", display: "flex" }}>
                  <li>{item.name}</li>
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

                  {/* 변경을 새로운 페이지에다 input을 만들어서 할지 아니면 이벤트 두개를 줄지 모르겟다.. */}
                  <Mutation
                    mutation={UPDATE_USER}
                    variables={{ id: item.id, name: this.state.text }}
                    refetchQueries={[{ query: USERS }]}
                  >
                    {updateUser => {
                      return (
                        <button type="submit" onClick={updateUser}>
                          변경
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
