import { useEffect, useState } from "react";
import axios from 'axios';
import ApproveTable from "./ApproveTable";
import { BsArrowClockwise } from "react-icons/bs";
import Pagenation from "../../component/Pagenation";



function Approve() {

  const [userRequest, setUserRequest] = useState([]); // 유저 리스트
  const [msg, setMsg] = useState(); // 리랜더링을 위해 useState 생성해서 응답 메시지 넣기
  const [inputText, setInputText] = useState(); // 검색창 value 값 state로 관리
  const [innerData, setInnerDate] = useState({ // 승인, 반려 버튼 눌렀을 때 해당 행의 값 state로 관리
    userqNUM : "",
    userqKIND : "",
    userqCOUNT : "",
    username : "",
    userqTITLE : "",
    userqCOMMENT : "",
    categoryNUM : ""
  });
  const [inputInnerData, setInputInnerDate] = useState({ // 검색 시 list 관리를 위한 state
    userqNUM : "",
    userqKIND : "",
    userqCOUNT : "",
    username : "",
    userqTITLE : "",
    userqCOMMENT : "",
    categoryNUM : ""
  });
  const handleToggle = (e) => { // 승인 모달창 핸들러
    let basicModal = document.getElementById("basicModal");
    basicModal.classList.toggle("show");
    basicModal.style.display = ((basicModal.style.display !== 'none') ? 'none' : 'block'); 
    setInnerDate({
      ...innerData,
      userqKIND : e.target.closest(".prod-box").querySelector(".userq_KIND").textContent,
      userqCOUNT : e.target.closest(".prod-box").querySelector(".userq_COUNT").textContent,
      username : e.target.closest(".prod-box").querySelector(".user_name").textContent,
      userqTITLE : e.target.closest(".prod-box").querySelector(".userq_TITLE").textContent,
      userqCOMMENT : e.target.closest(".prod-box").querySelector(".userq_COMMENT").textContent,
      userqNUM : e.target.closest(".prod-box").querySelector(".userq_NUM").textContent,
      categoryNUM : e.target.closest(".prod-box").querySelector(".category_NUM").textContent,
    });
   };
  const handleBackToggle = (e) => { // 반려 모달창 핸들러
    let basicModal = document.getElementById("basicModalBack");
    basicModal.classList.toggle("show");
    basicModal.style.display = ((basicModal.style.display !== 'none') ? 'none' : 'block'); 
    setInnerDate({
      ...innerData,
      userqKIND : e.target.closest(".prod-box").querySelector(".userq_KIND").textContent,
      userqCOUNT : e.target.closest(".prod-box").querySelector(".userq_COUNT").textContent,
      username : e.target.closest(".prod-box").querySelector(".user_name").textContent,
      userqTITLE : e.target.closest(".prod-box").querySelector(".userq_TITLE").textContent,
      userqCOMMENT : e.target.closest(".prod-box").querySelector(".userq_COMMENT").textContent,
      userqNUM : e.target.closest(".prod-box").querySelector(".userq_NUM").textContent,
      categoryNUM : e.target.closest(".prod-box").querySelector(".category_NUM").textContent,
    });
  

  };
  const handleClose =() =>  { // 승인 모달창 닫는 핸들러
    let basicModal = document.getElementById("basicModal");
    basicModal.style.display = "none";
    basicModal.classList.toggle("show");
  };
  const handleBackClose = () => { // 반려 모달창 닫는 핸들러
    let basicModalBack = document.getElementById("basicModalBack");
    basicModalBack.style.display = "none";
    basicModalBack.classList.toggle("show");
  };
  const ApproveForm = (e, userqNUM) => { // Spring Boot로 승인 요청
    e.preventDefault();
    axios({
      url: 'http://localhost:9191/UserRequest/UserRequestApprove',
      method: 'post',
      data: {
        userq_NUM: userqNUM
      }
    })
      .then((response) => {
        
        setMsg(response.data);
        if (inputInnerData.userqNUM !== "") {
          setInputInnerDate(prevState => {
              // userqNUM이 일치하지 않는 요소만 필터링하여 새로운 배열 생성
              const updatedInputInnerData = prevState.filter(item => item.userqNUM !== inputInnerData.userqNUM);
              return updatedInputInnerData;
          });
      }
        handleClose();
        alert("정상적으로 사용 승인처리 되었습니다.");
      })
      .catch((error) => {
        alert("승인처리에 실패하였습니다.");
      });
  };
  const returnForm = (e, userqNUM) => { // Spring Boot로 반려 요청
    e.preventDefault();
    axios({
      url: 'http://localhost:9191/UserRequest/UserRequestReturn',
      method: 'post',
      data: {
        userq_NUM: userqNUM
      }
    })
      .then((response) => {
        setMsg(response.data);
        if (inputInnerData.userqNUM !== "") {
          setInputInnerDate(prevState => {
              // userqNUM이 일치하지 않는 요소만 필터링하여 새로운 배열 생성
              const updatedInputInnerData = prevState.filter(item => item.userqNUM !== inputInnerData.userqNUM);
              return updatedInputInnerData;
          });
      }
      
        handleBackClose();
        alert("정상적으로 사용 반려처리 되었습니다.");
      })
      .catch((error) => {
        alert("반려처리에 실패하였습니다." + error);
      });
  }
  const activeEnter = (e) => { // Enter 눌렀을 때 axios 함수 호출
    if(e.key === 'Enter'){
      let searchInput = document.getElementById("search-input");
      SearchForm(inputText);
    }
  }
  const SearchForm = (inputText) => { // 검색 String boot로 전달
    axios({
      url: 'http://localhost:9191/UserRequest/UserRequestSearch',
      method: 'post',
      data: {
        inputText: inputText
      }
    })
      .then((response) => {
        if(response.data.length === 0){
          alert("일치하는 내역이 없습니다.");
          resetBtn();
        } else {
          setInputInnerDate(response.data);
        }      })
      .catch((error) => {
        alert("검색에 실패하였습니다.");
      });
  };
  const resetBtn = () => { // 리셋 버튼
    let searchInput = document.getElementById("search-input");
    setInputInnerDate([]);
    searchInput.value = "";

  }

  //////////////////////////////////////////////// page
  const handleClick2 = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /* 몇개씩 보이고 싶은지 */
  const [itemsPerPage, setItemPerPage] = useState(10); // 페이지당 10개의 아이템  useState(처음에 보이고싶은 개수)
  // const handleSelectorChange = (event) => {
  //   setItemPerPage(Number(event.target.value));
  // };
  const totalPages = Math.ceil(userRequest.length / itemsPerPage); // 총 버튼 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수
  const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 페이지 그룹
  const startPage = (currentGroup - 1) * pagesPerGroup; // 시작 페이지
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  useEffect(() => { // 랜더링
    if(inputInnerData.username === "" || inputInnerData.length === 0){
      // axios.get('http://localhost:9191/UserRequest/UserRequestList').then(res => console.log(res.data));
      axios.get('http://localhost:9191/UserRequest/UserRequestList').then(res => setUserRequest(res.data));
    } else {
      setUserRequest(inputInnerData);
    }
  },[msg, inputInnerData]);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>자산 신청내역 조회/처리</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Tables</li>
              <li className="breadcrumb-item active">Data</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">자산 사용 신청내역 조회</h5>
                  <div className="datatable-wrapper datatable-loading nofooter sortable searchable fixed-columns">
                    <div className="datatable-top">
                      <div className="datatable-dropdown">
                        <label htmlFor="">
                          <select className="datatable-selector">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                          </select>
                        </label>
                      </div>
                      <div className="datatable-search">
                        <button type="button" className="btn btn-primary reset-btn"><BsArrowClockwise style={{width : "30px", height : "30px", color : "gray"}}
                        onClick={resetBtn}/></button>

                        <input
                          className="datatable-input"
                          placeholder="검색"
                          type="search"
                          title="Search within table"
                          id="search-input"
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={(e) => activeEnter(e)} 
                        />
                      </div>
                    </div>
                  </div>
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            #
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            신청자
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            자산명
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            수량
                          </a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" className="datatable-sorter">
                            신청날짜
                          </a>
                        </th>
                        
                        <th data-sortable="true" className="handle">
                          <a href="#" className="datatable-sorter">
                            승인
                          </a>
                        </th>
                        <th data-sortable="true" className="handle">
                          <a href="#" className="datatable-sorter">
                            반려
                          </a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {/* 테이블리스트 */}


                      {userRequest.map((item,index) => (
                        <ApproveTable key={index} {...item} func={handleToggle} funcClose={handleBackToggle} index={index}/> 
                      ))}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Pagenation
              currentPage={currentPage}
              totalPages={totalPages}
              startPage={startPage}
              endPage={endPage}
              handleClick={handleClick2}
          />
      </main>

      {/* 승인 모달창 */}
      <div className="modal fade" id="basicModal" tabIndex="-1" style={{display : "none"}} 
      aria-modal="true"  role="dialog" >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">승인 확인</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    
                      <form action="#" name="ApproveForm">
                        <div className="modal-body">
                          <p>제목 : {innerData.userqTITLE}</p>
                          <hr />
                          <p>신청자명 : {innerData.username}</p>
                          <p>내용 : {innerData.userqCOMMENT}</p>
                          <p>자산명 : {innerData.userqKIND}</p>
                          <p>수량 : {innerData.userqCOUNT}개</p>
                          <p>카테고리 번호 : {innerData.categoryNUM}개</p>
                          <hr />
                          <p>해당 자산 사용신청을 승인처리 하시겠습니까?</p>
                          <input className="userq_NUM" type="hidden" value={innerData.userqNUM}/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>취소</button>
                          <button type="button" className="btn btn-primary" onClick={(e) => ApproveForm(e, innerData.userqNUM)}>승인</button>
                        </div>
                     </form>
                  </div>
                </div>
      </div>

      {/* 반려 모달창 */}
      <div className="modal fade" id="basicModalBack" tabIndex="-1" style={{display : "none"}} 
      aria-modal="true" role="dialog" >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" >반려 확인</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleBackClose}></button>
                    </div>
                  

                    <form action="#" name="ApproveForm">
                        <div className="modal-body">
                          <p>제목 : {innerData.userqTITLE}</p>
                          <hr />
                          <p>신청자명 : {innerData.username}</p>
                          <p>내용 : {innerData.userqCOMMENT}</p>
                          <p>자산명 : {innerData.userqKIND}</p>
                          <p>수량 : {innerData.userqCOUNT}개</p>
                          <p>카테고리 번호 : {innerData.categoryNUM}번</p>
                          <hr />
                          <p>해당 자산 사용신청을 반려처리 하시겠습니까?</p>
                          <input className="userq_NUM" type="hidden" value={innerData.userqNUM}/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleBackClose}>취소</button>
                          <button type="button" className="btn btn-primary" onClick={(e) => returnForm(e, innerData.userqNUM)}>반려</button>
                        </div>
                     </form>

                  </div>
                </div>
      </div>
    </div>
  );
}
export default Approve;
