module.exports = [
"[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmployeeReports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Nuthur/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Nuthur/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function EmployeeReports() {
    const [allReports, setAllReports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchName, setSearchName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    // Fetch reports from backend
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch("http://localhost:5000/api/reports/list") // <--- endpoint كامل للبك اند
        .then((res)=>res.json()).then((data)=>setAllReports(data)).catch((err)=>console.error("Error fetching reports:", err));
    }, []);
    // Update report status
    const updateStatus = (id, status)=>{
        fetch(`http://localhost:5000/api/reports/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status
            })
        }).then((res)=>res.json()).then((updatedReport)=>{
            setAllReports((prev)=>prev.map((r)=>r._id === updatedReport._id ? updatedReport : r));
        }).catch((err)=>console.error("Error updating status:", err));
    };
    // Apply filters
    const filteredReports = allReports.filter((r)=>r.user.name.toLowerCase().includes(searchName.toLowerCase()) && (statusFilter === "All" || r.status === statusFilter));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f4f4f9",
            padding: "20px",
            minHeight: "100vh"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    textAlign: "center",
                    color: "#333"
                },
                children: "Employee - Volunteer Reports Dashboard"
            }, void 0, false, {
                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search by volunteer name...",
                        value: searchName,
                        onChange: (e)=>setSearchName(e.target.value),
                        style: {
                            padding: "5px 10px",
                            margin: "0 5px",
                            fontSize: "14px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: statusFilter,
                        onChange: (e)=>setStatusFilter(e.target.value),
                        style: {
                            padding: "5px 10px",
                            margin: "0 5px",
                            fontSize: "14px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "All",
                                children: "All Statuses"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "approved",
                                children: "Approved"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "rejected",
                                children: "Rejected"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "pending",
                                children: "Pending"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                },
                children: filteredReports.map((report)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "15px",
                            margin: "10px",
                            width: "300px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            backgroundColor: report.status === "approved" ? "#d4edda" : report.status === "rejected" ? "#f8d7da" : "#fff3cd",
                            transition: "transform 0.2s"
                        },
                        onMouseEnter: (e)=>e.currentTarget.style.transform = "translateY(-5px)",
                        onMouseLeave: (e)=>e.currentTarget.style.transform = "translateY(0)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    margin: "0 0 10px 0",
                                    fontSize: "18px",
                                    color: "#555"
                                },
                                children: report.user.name
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "5px 0",
                                    fontSize: "14px",
                                    color: "#666"
                                },
                                children: [
                                    "Description: ",
                                    report.description
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "5px 0",
                                    fontSize: "14px",
                                    color: "#666"
                                },
                                children: [
                                    "Status: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: "bold"
                                        },
                                        children: report.status
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                        lineNumber: 85,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>updateStatus(report._id, "approved"),
                                        style: {
                                            margin: "5px 5px 0 0",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            backgroundColor: "#28a745",
                                            color: "white",
                                            border: "none",
                                            fontSize: "13px"
                                        },
                                        children: "Approve"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>updateStatus(report._id, "rejected"),
                                        style: {
                                            margin: "5px 5px 0 0",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            backgroundColor: "#dc3545",
                                            color: "white",
                                            border: "none",
                                            fontSize: "13px"
                                        },
                                        children: "Reject"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>updateStatus(report._id, "pending"),
                                        style: {
                                            margin: "5px 5px 0 0",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            backgroundColor: "#ffc107",
                                            color: "black",
                                            border: "none",
                                            fontSize: "13px"
                                        },
                                        children: "Pending"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, report._id, true, {
                        fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Nuthur/frontend/app/employeeReport/page.js",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Downloads_Nuthur_frontend_app_employeeReport_page_d703c284.js.map