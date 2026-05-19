import mongoose from "mongoose";
import Department from "../department/models/departments.js";
import Employee from "./models/Employee.js";
import Position from "./models/Position.js";
import { getNextSequence } from "../../../utils/Counter.js";

export const AddDpts = async (branches, departments) => {
  const results = [];
  for (const branch of branches) {
    for (const dpt of departments) {
      const existing = await Department.findOne({ branch, department: dpt });

      if (!existing) {
        results.push({
          branch,
          department: dpt,
        });
      }
    }
  }
  if (results.length === 0) return [];
  const result = await Department.insertMany(results);

  return results;
};
export const GetDepartments = async ({ branchId, search = "" }) => {
  let filter = {};
  if (search) {
    filter.departments = { $regex: search, $options: "i" };
  }
  if (branchId) {
    filter.branch = branchId;
  }

  const dpts = await Department.find(filter)
    .populate("branch", "name")
    .sort({ createdAt: -1 })
    .lean();

  return dpts;
};

export const UpdateDepartment = async (id, department) => {
  return await Department.findByIdAndUpdate(id, { department }, { new: true });
};

export const DeleteDepartment = async (id) => {
  return await Department.findByIdAndDelete(id);
};
export const AddPos = async (branch, department, positions) => {
  const results = [];
  for (const pos of positions) {
    const existing = await Position.findOne({
      branch,
      department,
      position: pos,
    });

    if (!existing) {
      results.push({
        branch,
        department,
        position: pos,
      });
    }
  }

  if (results.length === 0) return [];
  const result = await Position.insertMany(results);

  return results;
};
export const GetPos = async ({ branch, search = "" }) => {
  let filter = {};

  if (search) {
    filter.position = { $regex: search, $options: "i" };
  }

  if (branch) {
    filter.branch = branch;
  }

  const dpts = await Position.find(filter)
    .populate("branch", "name")
    .populate("department", "department")
    .sort({ createdAt: -1 })
    .lean();

  return dpts;
};
export const UpdatePos = async (id, department, position) => {
  return await Position.findByIdAndUpdate(
    id,
    { department, position },
    { new: true },
  );
};

export const DeletePos = async (id) => {
  return await Position.findByIdAndDelete(id);
};
export const AddEmp = async (personal, work, branch) => {
  const seq = await getNextSequence("employee");

  const employeeCode = `EMP${String(seq).padStart(3, "0")}`;
  const res = await Employee.create({
    branch: branch,
    employeeCode,
    personalDetails: personal,
    workInformation: work,
  });
  return res;
};
export const GetEmp = async ({ branch, search = "" }) => {
  const pipeline = [];

  // First filter by branch
  if (branch) {
    pipeline.push({
      $match: {
        branch: new mongoose.Types.ObjectId(branch),
      },
    });
  }

  // Join department
  pipeline.push({
    $lookup: {
      from: "departments",
      localField: "workInformation.department",
      foreignField: "_id",
      as: "department",
    },
  });

  // Join position
  pipeline.push({
    $lookup: {
      from: "positions",
      localField: "workInformation.position",
      foreignField: "_id",
      as: "position",
    },
  });

  // Search (only if user typed something)
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          {
            "personalDetails.firstName": {
              $regex: search,
              $options: "i",
            },
          },

          {
            "personalDetails.email": {
              $regex: search,
              $options: "i",
            },
          },

          {
            "department.department": {
              $regex: search,
              $options: "i",
            },
          },

          {
            "position.position": {
              $regex: search,
              $options: "i",
            },
          },
        ],
      },
    });
  }
  pipeline.push({
    $project: {
      _id: 1,

      firstName: "$personalDetails.firstName",

      email: "$personalDetails.email",
      phone: "$personalDetails.phone",
      department: {
        $arrayElemAt: ["$department.department", 0],
      },

      position: {
        $arrayElemAt: ["$position.position", 0],
      },
    },
  });

  pipeline.push({
    $sort: { createdAt: -1 },
  });

  const Emplys = await Employee.aggregate(pipeline);

  return Emplys;
};
export const GetOneEmpl = async (id) => {
  const res = await Employee.findById(id)
    .populate("branch", "name")
    .populate("workInformation.department", "department")
    .populate("workInformation.position", "position")
    .lean();
    console.log("this is the response",res)
  return res;
};
export const UpdateById = async (id, personal, work) => {
  console.log("this is the updating", id, personal, work);

  const res = await Employee.findByIdAndUpdate(
    id,
    { personalDetails: personal, workInformation: work },
    { new: true },
  );
  return res;
};
export const DeleteEmp = async (id) => {
  const res = await Employee.findByIdAndDelete(id);
  return res;
};
