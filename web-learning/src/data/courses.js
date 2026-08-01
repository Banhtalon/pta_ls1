export const PUBLIC_BASE_URL = import.meta.env?.BASE_URL || '/';
const assetPath = (fileName) => `${PUBLIC_BASE_URL}assets/ai/${fileName}`;

const BASIC_TITLES = [
  'Website hoạt động như thế nào',
  'HTML bậc trung & Web nhiều trang',
  'Trang trí cho website như thế nào',
  'CSS bậc trung',
  'CSS nâng cao & Checkpoint 1',
  'Bootstrap & Web Design (P1)',
  'Bootstrap & Web Design (P2)',
  'Thu thập dữ liệu người dùng',
  'Khám phá ý tưởng lập trình & Checkpoint 2',
  'Thực hành xây dựng sản phẩm cuối khóa (Phần 1)',
  'Thực hành xây dựng sản phẩm cuối khóa (Phần 2)',
  'Thực hành xây dựng sản phẩm cuối khóa (Phần 3)',
  'Hoàn thiện sản phẩm cuối khóa',
  'Thuyết trình dự án cuối khóa'
];

const ADVANCE_TITLES = [
  'Hệ thống lưới trong thiết kế giao diện',
  'Sức mạnh của ngôn ngữ lập trình JavaScript',
  'Toán tử, câu điều kiện & vòng lặp',
  'Array, Object & DOM',
  'Hàm & Checkpoint 1',
  'MindX Cinema (Phần 1)',
  'MindX Cinema (Phần 2)',
  'MindX Cinema (Phần 3)',
  'Khám phá ý tưởng lập trình & Checkpoint 2',
  'Thực hành xây dựng sản phẩm cuối khóa (Phần 1)',
  'Thực hành xây dựng sản phẩm cuối khóa (Phần 2)',
  'Thực hành xây dựng sản phẩm cuối khóa (Phần 3)',
  'Nghiệm thu sản phẩm',
  'Thuyết trình dự án cuối khóa'
];

const INTENSIVE_TITLES = [
  'Ôn tập kiến thức',
  'JavaScript chuyên sâu',
  'Firebase và thiết lập máy chủ',
  'Firebase và xác thực người dùng',
  'Firestore và Firebase Storage',
  'Lên ý tưởng và mô hình phát triển',
  'Thiết kế giao diện website (Phần 1)',
  'Thiết kế giao diện website (Phần 2)',
  'Thiết kế giao diện website (Phần 3)',
  'Xây dựng tính năng website (Phần 1)',
  'Xây dựng tính năng website (Phần 2)',
  'Xây dựng tính năng website (Phần 3)',
  'Chưa có tiêu đề độc lập được xác nhận trong bản Teaching Guide hiện có',
  'Thuyết trình dự án cuối khóa'
];

const createLessons = (courseId, titles) => titles.map((title, index) => ({
  id: `${courseId}-${String(index + 1).padStart(2, '0')}`,
  courseId,
  order: index + 1,
  title,
  status: 'draft',
  summary: 'Nội dung bài học sẽ được bổ sung sau.',
  contentVersion: 1,
  objectives: [],
  blocks: [],
  quiz: [],
  practice: [],
  assets: [],
  titleNeedsConfirmation: courseId === 'web-intensive' && index === 12
}));

export const COURSES = [
  {
    id: 'web-basic',
    code: 'JSB',
    name: 'Web Basic',
    fullName: 'Web Developer Basic',
    eyebrow: 'Nền tảng vững chắc',
    description: 'Làm quen với cách website hoạt động, HTML, CSS, Bootstrap và quy trình tạo sản phẩm web đầu tiên.',
    accent: 'green',
    iconPath: assetPath('icon-web-basic.png'),
    iconAlt: 'Minh họa cửa sổ trình duyệt và ký hiệu mã nguồn',
    lessons: createLessons('web-basic', BASIC_TITLES)
  },
  {
    id: 'web-advance',
    code: 'JSA',
    name: 'Web Advance',
    fullName: 'Web Developer Advanced',
    eyebrow: 'Tư duy tương tác',
    description: 'Đi sâu vào JavaScript, DOM, cấu trúc dữ liệu và cách biến giao diện thành ứng dụng tương tác.',
    accent: 'blue',
    iconPath: assetPath('icon-web-advance.png'),
    iconAlt: 'Minh họa các thành phần giao diện web được kết nối',
    lessons: createLessons('web-advance', ADVANCE_TITLES)
  },
  {
    id: 'web-intensive',
    code: 'JSI',
    name: 'Web Intensive',
    fullName: 'Web Developer Intensive',
    eyebrow: 'Xây dựng sản phẩm',
    description: 'Ôn tập, làm chủ JavaScript chuyên sâu và triển khai các tính năng web với Firebase.',
    accent: 'teal',
    iconPath: assetPath('icon-web-intensive.png'),
    iconAlt: 'Minh họa máy chủ, cơ sở dữ liệu và kết nối mạng',
    lessons: createLessons('web-intensive', INTENSIVE_TITLES)
  }
];

export const TOTAL_LESSONS = COURSES.reduce((total, course) => total + course.lessons.length, 0);

export function findCourse(courseId) {
  return COURSES.find((course) => course.id === courseId);
}

export function findLesson(courseId, order) {
  const course = findCourse(courseId);
  return course?.lessons.find((lesson) => lesson.order === Number(order));
}
