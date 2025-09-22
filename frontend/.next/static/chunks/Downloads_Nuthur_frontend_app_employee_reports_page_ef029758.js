(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmployeeReports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Nuthur/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Nuthur/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function EmployeeReports() {
    _s();
    const [allReports, setAllReports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchName, setSearchName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Fetch reports from backend
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmployeeReports.useEffect": ()=>{
            const token = localStorage.getItem("authToken");
            fetch("http://localhost:5000/api/reports", {
                headers: {
                    "Authorization": "Bearer ".concat(token)
                }
            }).then({
                "EmployeeReports.useEffect": (res)=>res.json()
            }["EmployeeReports.useEffect"]).then({
                "EmployeeReports.useEffect": (data)=>{
                    setAllReports(data);
                    setLoading(false);
                }
            }["EmployeeReports.useEffect"]).catch({
                "EmployeeReports.useEffect": (err)=>{
                    console.error("Error fetching reports:", err);
                    setLoading(false);
                }
            }["EmployeeReports.useEffect"]);
        }
    }["EmployeeReports.useEffect"], []);
    // Update report status
    const updateStatus = (id, status)=>{
        const token = localStorage.getItem("authToken");
        fetch("http://localhost:5000/api/reports/update/".concat(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ".concat(token)
            },
            body: JSON.stringify({
                status
            })
        }).then((res)=>res.json()).then((updatedReport)=>{
            setAllReports((prev)=>prev.map((r)=>r._id === updatedReport._id ? updatedReport : r));
        }).catch((err)=>console.error("Error updating status:", err));
    };
    // Apply filters
    const filteredReports = allReports.filter((r)=>{
        var _r_user_name, _r_user;
        return ((_r_user = r.user) === null || _r_user === void 0 ? void 0 : (_r_user_name = _r_user.name) === null || _r_user_name === void 0 ? void 0 : _r_user_name.toLowerCase().includes(searchName.toLowerCase())) && (statusFilter === "All" || r.status === statusFilter);
    });
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Loading..."
    }, void 0, false, {
        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
        lineNumber: 55,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f4f4f9",
            padding: "20px",
            minHeight: "100vh"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    textAlign: "center",
                    color: "#333"
                },
                children: "Employee - Volunteer Reports Dashboard"
            }, void 0, false, {
                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: statusFilter,
                        onChange: (e)=>setStatusFilter(e.target.value),
                        style: {
                            padding: "5px 10px",
                            margin: "0 5px",
                            fontSize: "14px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "All",
                                children: "All Statuses"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "approved",
                                children: "Approved"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "rejected",
                                children: "Rejected"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "pending",
                                children: "Pending"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                },
                children: filteredReports.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "No reports found"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                    lineNumber: 85,
                    columnNumber: 11
                }, this) : filteredReports.map((report)=>{
                    var _report_user, _report_user1;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    margin: "0 0 10px 0",
                                    fontSize: "18px",
                                    color: "#555"
                                },
                                children: [
                                    (_report_user = report.user) === null || _report_user === void 0 ? void 0 : _report_user.name,
                                    " (",
                                    (_report_user1 = report.user) === null || _report_user1 === void 0 ? void 0 : _report_user1.email,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "5px 0",
                                    fontSize: "14px",
                                    color: "#666"
                                },
                                children: [
                                    "Status: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: "bold"
                                        },
                                        children: report.status
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                        lineNumber: 111,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this),
                            report.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "http://localhost:5000/api/reports/image/".concat(report.image.split("/").pop()),
                                alt: "report",
                                width: "100%",
                                style: {
                                    borderRadius: "5px",
                                    marginTop: "10px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 116,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: "10px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                        lineNumber: 126,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Nuthur$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this)
                        ]
                    }, report._id, true, {
                        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                        lineNumber: 88,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Nuthur/frontend/app/employee/reports/page.js",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(EmployeeReports, "TCnx8aGSCF/yOn6ksNW9WZ5x7Mg=");
_c = EmployeeReports;
var _c;
__turbopack_context__.k.register(_c, "EmployeeReports");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Nuthur_frontend_app_employee_reports_page_ef029758.js.map