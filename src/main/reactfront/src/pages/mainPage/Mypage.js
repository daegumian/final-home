
import { useEffect, useState } from 'react';
import "../../styles/Style.css";
import axios from 'axios';

function Mypage() {
  const [userInfo, setUserInfo] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUser_name] = useState("");
  const [user_depart, setUser_depart] = useState("");
  const [user_phone, setUser_phone] = useState("");
  const [user_address, setUser_address] = useState("");
  const [user_email, setUser_email] = useState("");
  const [user_joindate, setUser_joindate] = useState("");
  const [modifyPage, setModifyPage] = useState(false);




  const getUserInfo = () => {
    axios.get('mainPage/getUserInfo', {
      params: {username: 'RD0009'}
    }).then(response => {setUserInfo(response.data);
      setUser_name(response.data.user_name);
      setUser_depart(response.data.user_depart);
      setUser_phone(response.data.user_phone);
      setUser_address(response.data.user_address);
      setUser_email(response.data.user_email);
      setUser_joindate(response.data.user_joindate);
      setUsername(response.data.username);
    })
        .catch(error => console.log(error))


  }
  useEffect(() => {
    getUserInfo();
  }, [])

  // useEffect(() => {
  //   axios.get('mainPage/getUserInfo', {
  //     params: {username: 'RD0009'}
  //   }).then(response => {setUserInfo(response.data);
  //     setUser_name(response.data.user_name);
  //     setUser_depart(response.data.user_depart);
  //     setUser_phone(response.data.user_phone);
  //     setUser_address(response.data.user_address);
  //     setUser_email(response.data.user_email);
  //     setUser_auth(response.data.user_auth);
  //     setUser_joindate(response.data.user_joindate);
  //     setUser_id(response.username);
  //   })
  //       .catch(error => console.log(error))
  // },[])

  //////////////////최후의 방법 모달창을 새로 만든다!!!!!!!!!!!!///////////////////
  const resetProfile = () => {
    if(window.confirm("수정을 취소하시겠습니까? 수정 중인 내용은 저장되지 않습니다."))
    {
      setModifyPage(false);
      setUser_name(userInfo.user_name);
      setUser_depart(userInfo.user_depart);
      setUser_address(userInfo.user_address);
      setUser_phone(userInfo.user_phone);
      setUser_email(userInfo.user_email);

    }

  }

  const handleModify = (e) => {
    e.preventDefault();
    const modifyForm = {
      username: username,
      user_name: user_name,
      user_phone: user_phone,
      user_address: user_address,
      user_email: user_email
    }
    if(window.confirm("정말 수정하시겠습니까?")) {

      axios.post('/mainPage/modifyProfile', modifyForm)
          .then(response => {
            alert('수정되었습니다');
            console.log(response.data);
            window.location.href="/myPage";
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }

          })
    }
  };


  return (
      <main id="main" className="main">

        {/*<Prompt*/}
        {/*    when={isChanged}*/}
        {/*    message="입력된 데이터는 취소됩니다. 이동하시겠습니까?"*/}
        {/*/>*/}

        <div className="pagetitle">
          <h1>Page Title</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item">Components</li>
              <li className="breadcrumb-item active">Breadcrumbs</li>
            </ol>
          </nav>
        </div>


        <section className="section profile">
          <div className="row">

            <div className="col-xl-12">

              <div className="card">
                <div className="col-xl-4" style={{ textAlign: "center" }}>


                </div>
                <div className="card-body pt-3">
                  {/* <!-- Bordered Tabs --> */}
                  <ul className="nav nav-tabs nav-tabs-bordered">

                    <li className="nav-item">
                      <button className="nav-link active tabtab" data-bs-toggle="tab" data-bs-target='#profile-overview' onClick={modifyPage ? resetProfile : null}>내 정보확인하기</button>
                    </li>

                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit"  onClick={() => {setUser_name(userInfo.user_name);

                        setUser_depart(userInfo.user_depart);
                        setUser_address(userInfo.user_address);
                        setUser_phone(userInfo.user_phone);
                        setUser_email(userInfo.user_email);
                        setUsername(userInfo.username);
                        setModifyPage(true)}}>내 정보수정하기</button>
                    </li>

                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password" onClick={modifyPage ? resetProfile : null}>비밀번호 변경</button>
                    </li>


                  </ul>
                  <div className="tab-content pt-2">

                    <div className="tab-pane fade show active profile-overview" id="profile-overview">

                      <h5 className="card-title" style={{fontWeight: "800"}}>프로필 상세정보</h5>

                      <div className="row">
                        <div className="row mb-3">
                          <label htmlFor="profileImage" className="col-md-4 col-lg-3 label">프로필 사진</label>
                          <div className="col-md-8 col-lg-9">
                            <img src="assets/img/profile-img.jpg" alt="Profile" />

                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">이름</div>
                        <div className="col-lg-9 col-md-8">{userInfo.user_name}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">사원번호</div>
                        <div className="col-lg-9 col-md-8">{userInfo.username}</div>
                      </div>


                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">부서</div>
                        <div className="col-lg-9 col-md-8">{userInfo.user_depart}</div>
                      </div>


                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">주소</div>
                        <div className="col-lg-9 col-md-8">{userInfo.user_address}</div>
                      </div>

                      <div className="row">

                        <div className="col-lg-3 col-md-4 label">전화번호</div>
                        <div className="col-lg-9 col-md-8">{userInfo.user_phone}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">이메일</div>
                        <div className="col-lg-9 col-md-8">{userInfo.user_email}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">입사일</div>
                        <div className="col-lg-9 col-md-8">{userInfo.user_joindate}</div>
                      </div>

                    </div>

                    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                      {/* <!-- Profile Edit Form --> */}
                      <form method="post" onSubmit={handleModify}>
                        <div className="row mb-3">
                          <label for="profileImage" className="col-md-4 col-lg-3 col-form-label">프로필 사진</label>
                          <div className="col-md-8 col-lg-9">
                            <img src="assets/img/profile-img.jpg" alt="Profile" />
                            <div className="pt-2">
                              <button className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></button>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="fullName" className="col-md-4 col-lg-3 col-form-label">이름</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="fullName" type="text" className="form-control" id="fullName" value={user_name} onChange={(e) => {setUser_name(e.target.value)}}/>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">사원번호</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="fullName" type="text" className="form-control" id="fullName" value={username} onChange={(e) => {setUsername(e.target.value)}} disabled/>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="company" className="col-md-4 col-lg-3 col-form-label">부서</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="company" type="text" className="form-control" id="company" value={user_depart} onChange={(e) => {setUser_depart(e.target.value)}} disabled/>
                          </div>
                        </div>



                        <div className="row mb-3">
                          <label for="Address" className="col-md-4 col-lg-3 col-form-label">주소</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="address" type="text" className="form-control" id="Address" value={user_address} onChange={(e) => {setUser_address(e.target.value)}} />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="Phone" className="col-md-4 col-lg-3 col-form-label">전화번호</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="phone" type="text" className="form-control" id="Phone" value={user_phone} onChange={(e) => {setUser_phone(e.target.value)}} />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="Email" className="col-md-4 col-lg-3 col-form-label">이메일</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="email" type="email" className="form-control" id="Email" value={user_email} onChange={(e) => {setUser_email(e.target.value)}} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label for="Email" className="col-md-4 col-lg-3 col-form-label">입사일</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="email" type="email" className="form-control" id="Email" value={user_joindate} onChange={(e) => {setUser_joindate(e.target.value)}} disabled/>
                          </div>
                        </div>


                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">수정하기</button>
                        </div>
                      </form>{/* <!-- End Profile Edit Form --> */}

                    </div>

                    <div className="tab-pane fade pt-3" id="profile-settings">


                    </div>

                    <div className="tab-pane fade pt-3" id="profile-change-password">
                      {/* <!-- Change Password Form --> */}
                      <form>

                        <div className="row mb-3">
                          <label for="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="password" type="password" className="form-control" id="currentPassword" />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="newpassword" type="password" className="form-control" id="newPassword" />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">Change Password</button>
                        </div>
                      </form>{/* <!-- End Change Password Form --> */}

                    </div>



                  </div>{/* <!-- End Bordered Tabs --> */}

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
  );
}

export default Mypage;
