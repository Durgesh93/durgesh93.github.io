PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS resource_steps;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS research;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS publications;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS skill_groups;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS profile;

CREATE TABLE profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  role TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT NOT NULL,
  office_email TEXT NOT NULL,
  personal_email TEXT NOT NULL,
  portrait TEXT NOT NULL,
  intro TEXT NOT NULL,
  about_one TEXT NOT NULL,
  about_two TEXT NOT NULL
);

CREATE TABLE links (id INTEGER PRIMARY KEY, label TEXT NOT NULL, url TEXT NOT NULL, sort_order INTEGER NOT NULL);
CREATE TABLE interests (id INTEGER PRIMARY KEY, name TEXT NOT NULL, sort_order INTEGER NOT NULL);
CREATE TABLE experience (id INTEGER PRIMARY KEY, period TEXT NOT NULL, title TEXT NOT NULL, organization TEXT NOT NULL, description TEXT NOT NULL, sort_order INTEGER NOT NULL);
CREATE TABLE education (id INTEGER PRIMARY KEY, period TEXT NOT NULL, degree TEXT NOT NULL, institution TEXT NOT NULL, location TEXT NOT NULL, detail TEXT, sort_order INTEGER NOT NULL);
CREATE TABLE skill_groups (id INTEGER PRIMARY KEY, name TEXT NOT NULL, sort_order INTEGER NOT NULL);
CREATE TABLE skills (id INTEGER PRIMARY KEY, group_id INTEGER NOT NULL REFERENCES skill_groups(id), name TEXT NOT NULL, sort_order INTEGER NOT NULL);
CREATE TABLE publications (
  id INTEGER PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  venue TEXT NOT NULL,
  summary TEXT NOT NULL,
  contribution TEXT NOT NULL,
  figure_path TEXT NOT NULL,
  figure_alt TEXT NOT NULL,
  figure_caption TEXT NOT NULL,
  paper_url TEXT NOT NULL,
  code_url TEXT,
  secondary_url TEXT,
  secondary_label TEXT,
  sort_order INTEGER NOT NULL
);
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technology TEXT NOT NULL,
  repo_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

INSERT INTO profile VALUES (
  1,
  'Durgesh K. Singh',
  'DKS',
  'Postdoctoral Research Fellow',
  'University of Oslo',
  'Oslo, Norway',
  'durgeshs@uio.no',
  'durgesh080793@gmail.com',
  'figs/myself1.jpg',
  'I develop machine learning methods for computer vision, with a focus on medical image analysis, label-efficient learning, and systems that translate into practical clinical tools.',
  'I am a Postdoctoral Research Fellow at the University of Oslo and a researcher within SFI Visual Intelligence. My work studies how deep learning systems can learn effectively from limited supervision and support dependable analysis of visual data.',
  'I completed my PhD at UiT The Arctic University of Norway in 2025. Before academia, I worked as a data scientist across healthcare, banking, e-commerce, and customer relationship management.'
);

INSERT INTO links VALUES
  (1, 'GitHub', 'https://github.com/durgesh93', 1),
  (2, 'LinkedIn', 'https://www.linkedin.com/in/durgesh93/', 2),
  (3, 'Visual Intelligence', 'https://www.visual-intelligence.no/people/durgesh-kumar-singh', 3),
  (4, 'University of Oslo', 'https://www.uio.no/english/', 4);

INSERT INTO interests VALUES
  (1, 'Medical image analysis', 1),
  (2, 'Computer vision', 2),
  (3, 'Label-efficient learning', 3),
  (4, 'Domain adaptation', 4);

INSERT INTO experience VALUES
  (1, 'Sep 2025–Current', 'Postdoctoral Research Fellow', 'University of Oslo · SFI Visual Intelligence', 'Developing AI methods for medical image analysis and healthcare systems, and supervising a master’s thesis in medical imaging and machine learning.', 1),
  (2, '2021–2025', 'PhD Researcher in Machine Learning', 'UiT The Arctic University of Norway', 'Researched semi-supervised learning and domain adaptation for cardiac image analysis, including segmentation, landmark tracking, and automated measurements; also served as a Machine Learning teaching assistant.', 2),
  (3, '2019–2020', 'Researcher', 'Video Analytics Lab, Indian Institute of Science', 'Developed methods for high-resolution HDR deghosting and multi-source domain adaptation, contributing to publications at ECCV and NeurIPS.', 3),
  (4, '2014–2018', 'System Engineer', 'Tata Consultancy Services', 'Designed data analytics solutions across healthcare, retail, and banking to improve operational insight and support decision-making.', 4);

INSERT INTO education VALUES
  (1, '2021–2025', 'PhD in Machine Learning', 'UiT The Arctic University of Norway', 'Tromsø, Norway', NULL, 1),
  (2, '2018–2020', 'M.Tech in Machine Learning and Computing', 'Indian Institute of Space Science and Technology', 'Trivandrum, India', 'CGPA: 9.43/10', 2),
  (3, '2010–2014', 'B.Tech in Information Technology', 'Institute of Engineering and Technology', 'Lucknow, India', 'Percentage: 77.1%', 3);

INSERT INTO skill_groups VALUES
  (1, 'Programming & Data', 1),
  (2, 'Machine Learning & AI', 2),
  (3, 'Software & Cloud', 3),
  (4, 'Embedded Systems & Automation', 4);

INSERT INTO skills VALUES
  (1, 1, 'Python', 1),
  (2, 1, 'SQL', 2),
  (3, 1, 'LaTeX', 3),
  (4, 1, 'Data Analytics', 4),
  (5, 1, 'Power BI', 5),
  (6, 1, 'Microsoft Fabric', 6),
  (7, 1, 'PySpark', 7),
  (8, 2, 'PyTorch', 1),
  (9, 2, 'TensorFlow', 2),
  (10, 2, 'Scikit-learn', 3),
  (11, 2, 'OpenCV', 4),
  (12, 2, 'MLflow', 5),
  (13, 2, 'Weights & Biases', 6),
  (14, 3, 'Docker', 1),
  (15, 3, 'Kubernetes', 2),
  (16, 3, 'AWS', 3),
  (17, 3, 'Git', 4),
  (18, 3, 'MongoDB', 5),
  (19, 3, 'Grafana', 6),
  (20, 4, 'Raspberry Pi', 1),
  (21, 4, 'Microcontroller Programming', 2),
  (22, 4, 'IoT', 3),
  (23, 4, 'Home Automation', 4),
  (24, 4, 'Sensor Communication', 5);

INSERT INTO publications VALUES
  (6, '2026', 'Semi-Supervised nnU-Net with Weak–Strong Consistency and Boundary Refinement for Mitral Valve Segmentation', 'Durgesh Kumar Singh, Sarina Thomas, Qing Cao, Michael C. Kampffmeyer, Robert Jenssen, Anne Schistad Solberg', 'MVAA Challenge at MICCAI 2026', 'The MICCAI 2026 Mitral Valve Anatomy Analysis (MVAA) challenge asks for mitral valve segmentation in cardiac CT, 3D transesophageal echocardiography, and intraoperative surgical video. Only a few CT scans and video frames are labeled, while many unlabeled images are available.', 'A separate nnU-Net is trained for each task. Labeled data use soft Dice and cross-entropy combined with a multi-class boundary loss whose weight grows during training. For CT and surgical video, unlabeled images are used through FixMatch-style weak–strong consistency: a geometrically augmented weak view produces confident pseudo-labels that supervise an intensity-augmented strong view. On the validation sets the method reached Dice scores of 0.834 for CT, 0.789 for 3D TEE, and 0.649 for surgical video.', 'figs/mvaa-figure.png', 'Diagram of a supervised nnU-Net branch on labeled data and a semi-supervised branch where a weakly augmented view produces confident pseudo-labels that supervise a strongly augmented view', 'Boundary-weighted supervision on labels; weak–strong consistency on unlabeled data', 'https://papers.miccai.org/miccai-2026-sat/MVAA_089.html', 'https://github.com/Durgesh93/MVAA/tree/code_mvaa_miccai_2026', 'https://papers.miccai.org/miccai-2026-sat/paper/MVAA_089.pdf', 'Open-access PDF', 1),
  (5, '2025', 'Towards more accurate and label-efficient Left Ventricle Automatic Measurements', 'Durgesh Kumar Singh', 'Doctoral thesis · UiT The Arctic University of Norway', 'Accurate left-ventricle measurements are essential for cardiac assessment, yet manual measurements are time-consuming and automated methods can struggle with anatomical variation and limited labeled data.', 'The thesis develops structure-aware and label-efficient learning methods for echocardiography. It progresses from constrained anatomical M-mode measurements to automatic scanline placement and also introduces clustering-based regularization for learning with limited supervision.', 'figs/thesis-cover.jpg', 'Cover of the doctoral thesis Towards more accurate and label-efficient Left Ventricle Automatic Measurements', 'Doctoral thesis · UiT The Arctic University of Norway · 2025', 'https://nva.sikt.no/registration/0198f5e085f1-89659294-7b80-45bf-9a61-f58e47831538', NULL, NULL, NULL, 2),
  (1, '2025', 'WiseLVAM: A Novel Framework for Left Ventricle Automatic Measurements', 'Durgesh Kumar Singh, Qing Cao, Sarina Thomas, Ahcène Boubekki, Robert Jenssen, Michael Kampffmeyer', 'ASMUS Workshop at MICCAI 2025', 'Cardiac measurements in echocardiography depend on placing a measurement line at an anatomically meaningful location. Small landmark errors can produce large measurement errors.', 'WiseLVAM first estimates the left-ventricle contour, infers its long axis and basal level, and places the scanline automatically. It then combines structural information from B-mode images with motion information from anatomical M-mode images to measure the ventricle.', 'figs/wiselvam-figure.png', 'Ultrasound image transformed into an anatomical scanline and cardiac measurements', 'Structure-aware scanline placement → motion-aware measurement', 'https://arxiv.org/abs/2508.12023', 'https://github.com/Durgesh93/AutoLVAM/tree/wiselvam', NULL, NULL, 3),
  (2, '2025', 'SuperCM: Learning with Labels and Clusters', 'Durgesh Singh, Ahcène Boubekki, Robert Jenssen, Michael Kampffmeyer', 'Pattern Recognition 2025 · ICASSP 2023', 'Semi-supervised systems have access to many unlabeled examples but only a small labeled set. The challenge is to use the structure of all the data without introducing a complicated training pipeline.', 'SuperCM puts a differentiable clustering module directly inside the network. Labeled examples guide the cluster centroids, allowing the model to learn a useful representation and decision boundary in a simple end-to-end process. The journal work extends the original ICASSP study to domain adaptation.', 'figs/supercm-figure.png', 'Labeled and unlabeled samples organized around learned cluster centers', 'Labels guide centroids; clusters shape the decision boundary', 'https://doi.org/10.1016/j.patcog.2025.112117', 'https://github.com/Durgesh93/SuperCM.git', 'https://sigport.org/documents/supercm-revisiting-clustering-semi-supervised-learning', 'ICASSP version', 4),
  (3, '2020', 'Your Classifier Can Secretly Suffice Multi-Source Domain Adaptation', 'Naveen Venkat, Jogendra Nath Kundu, Durgesh Kumar Singh, Ambareesh Revanur, R. Venkatesh Babu', 'NeurIPS 2020', 'Multi-source domain adaptation usually introduces separate alignment machinery to reconcile several labeled source domains with an unlabeled target domain.', 'We showed that the classifier itself can provide the adaptation signal. By exploiting classifier predictions and class relationships, the approach keeps the model compact while adapting knowledge from multiple sources to a new visual domain.', 'figs/domain-adaptation-figure.png', 'Multiple source domains passing through a shared classifier to a target domain', 'The classifier carries adaptation across multiple domains', 'https://arxiv.org/abs/2103.11169', 'https://github.com/Durgesh93/SImpAl', NULL, NULL, 5),
  (4, '2020', 'Towards Practical and Efficient High-Resolution HDR Deghosting with CNN', 'K. Ram Prabhakar, Susmit Agrawal, Durgesh K. Singh, Balraj Ashwath, R. Venkatesh Babu', 'ECCV 2020', 'Combining differently exposed photographs can recover high dynamic range, but motion between exposures creates ghosting. Existing neural methods were difficult to run at the resolution of modern cameras.', 'The proposed coarse-to-fine CNN aligns and fuses information efficiently, processing images at substantially higher resolution while retaining strong deghosting quality.', 'figs/hdr-figure.png', 'Three exposures fused into a high dynamic range image', 'Efficient coarse-to-fine fusion at high resolution', 'https://www.ecva.net/papers/eccv_2020/papers_ECCV/papers/123660494.pdf', 'https://github.com/durgesh93/AHDR-Net', NULL, NULL, 6);

INSERT INTO projects VALUES
  (1, 'Detection Transformer on Multi-MNIST', 'An unofficial re-implementation of DETR, trained and evaluated on a synthetic Multi-MNIST detection dataset with training and inference notebooks.', 'Python · PyTorch · Transformers · Object Detection', 'https://github.com/Durgesh93/ml_projects/tree/DETR', 1,
  (2, 'Orca Call Detection', 'A Dockerised training pipeline for detecting orca calls in hydrophone recordings, with dataset download, configuration, and model code.', 'Python · PyTorch · Audio · Docker', 'https://github.com/Durgesh93/ml_projects/tree/orca_detect', 2,
  (3, 'Orcasound Audio Preprocessing', 'Notebooks exploring FFT, background-noise removal, and librosa effects on Orcasound Lab recordings as preparation for orca-call detection.', 'Python · Jupyter · librosa · Signal Processing', 'https://github.com/Durgesh93/ml_projects/tree/Orca_al', 3,
  (4, 'Fish Recognition Evaluation', 'Evaluation and ensembling scripts for fish recognition models on pond imagery, comparing checkpoints and aggregating predictions.', 'Python · PyTorch · Ensembles', 'https://github.com/Durgesh93/ml_projects/tree/fish', 4,
  (5, 'Acne Severity Prediction', 'Face-landmark driven detection and severity scoring of acne from photographs using classical OpenCV techniques.', 'Python · OpenCV · dlib · Jupyter', 'https://github.com/Durgesh93/ml_projects/tree/Acne_detection', 5,
  (6, 'Image Segmentation Playground', 'A visual comparison of K-means, fuzzy C-means, and mean-shift algorithms on the same segmentation task.', 'Python · Jupyter · Computer Vision', 'https://github.com/Durgesh93/ml_projects/tree/Image_Segmentation', 6,
  (7, 'Forest Fire Prediction', 'A notebook experiment exploring environmental measurements and regression models for predicting forest-fire impact.', 'Python · Jupyter · Regression', 'https://github.com/Durgesh93/ml_projects/tree/Forestfire', 7,
  (8, 'Buy Affinity', 'Predicting the tendency of existing e-commerce customers to purchase a product from their transaction history.', 'Python · Jupyter · Classification', 'https://github.com/Durgesh93/ml_projects/tree/BuyAffinity', 8,
  (9, 'Market Basket Explorer', 'A small data-mining project that discovers frequently co-occurring products using the Apriori algorithm.', 'Python · Jupyter · Association Rules', 'https://github.com/Durgesh93/ml_projects/tree/Market_basket_analysis', 9,
  (10, 'POS Tagging with GRUs', 'A comparison of GRU cell variants for part-of-speech tagging on the Penn Treebank, written as an M.Tech mini project.', 'Python · Recurrent Neural Networks · NLP', 'https://github.com/Durgesh93/ml_projects/tree/POS_Tagging', 10,
  (11, 'Collocations in Moby Dick', 'Finding statistically significant word collocations in the text of Moby Dick with NLTK.', 'Python · Jupyter · NLTK · NLP', 'https://github.com/Durgesh93/ml_projects/tree/Collocation', 11);
