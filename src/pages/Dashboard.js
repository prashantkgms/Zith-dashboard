import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { getPosts } from '../api/postsApi';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, IconButton, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.theme); // Get theme from Redux
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filter, setFilter] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff6347'];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPosts();
                setPosts(postsData);
                setFilteredPosts(postsData);
            } catch (err) {
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const filterPosts = () => {
            const filtered = posts.filter(
                (post) =>
                    post.title.toLowerCase().includes(filter.toLowerCase()) ||
                    post.content.toLowerCase().includes(filter.toLowerCase()) ||
                    post.author.toLowerCase().includes(filter.toLowerCase())
            );
            setFilteredPosts(filtered);
        };

        filterPosts();
    }, [filter, posts]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const sortPosts = (postsData) => {
        return postsData.sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage + 1);
    };

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const postsPerUser = posts.reduce((acc, post) => {
        acc[post.author] = acc[post.author] ? acc[post.author] + 1 : 1;
        return acc;
    }, {});

    const chartData = Object.keys(postsPerUser).map((author) => ({
        name: author,
        posts: postsPerUser[author],
    }));

    const pieData = Object.keys(postsPerUser).map((author) => ({
        name: author,
        value: postsPerUser[author],
    }));

    const totalPosts = posts.length;

    const chartLineColor = mode === 'dark' ? '#82ca9d' : '#8884d8'; // Line chart color based on theme
    const pieChartFillColors = mode === 'dark' ? ['#e0e0e0', '#b2b2b2'] : ['#8884d8', '#82ca9d']; // Pie chart colors based on theme

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={`p-8 mr-8 ml-8 mt-4 mb-4 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            {/* Posts Table 1 Section */}
            <div className="mt-8 flex space-x-8">
                <div className="flex-1">
                    <h3 className="text-lg mb-4">Posts Overview</h3>
                    <TableContainer component={Paper} className={mode === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Title</strong>
                                        <IconButton onClick={toggleSortDirection}>
                                            {sortDirection === 'asc' ? <ArrowDownward /> : <ArrowUpward />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell><strong>Description</strong></TableCell>
                                    <TableCell><strong>Reporter</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortPosts(currentPosts).map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{post.content}</TableCell>
                                        <TableCell>{post.author}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredPosts.length}
                        rowsPerPage={postsPerPage}
                        page={currentPage - 1}
                        onPageChange={handlePageChange}
                    />
                </div>

                {/* Divider between Tables */}
                <div className="h-auto border-r-2 border-dotted border-gray-400 mb-4"></div>

                {/* Posts Table 2 Section */}
                <div className="w-1/3">
                    <h3 className="text-lg mb-4">Posts by Author</h3>
                    <TableContainer component={Paper} className={mode === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Author</strong></TableCell>
                                    <TableCell align="right"><strong>Posts</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(postsPerUser).map(([author, postsCount]) => (
                                    <TableRow key={author}>
                                        <TableCell>{author}</TableCell>
                                        <TableCell align="right">{postsCount}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell><strong>Total Posts</strong></TableCell>
                                    <TableCell align="right"><strong>{totalPosts}</strong></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {/* Divider between the tables and charts */}
            <div className="mt-8 mb-8 h-px border-t border-dotted border-gray-400"></div>

            {/* Charts Section */}
            <div className="mt-8">
                <h3 className="text-lg mb-4">Charts</h3>
                <div className="flex space-x-8">
                    {/* Line Chart */}
                    <div style={{ width: '50%', height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="posts" stroke={chartLineColor} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Divider between the charts */}
                    <div className="h-auto border-r-2 border-dotted border-gray-400 mb-4"></div>

                    {/* Pie Chart */}
                    <div style={{ width: '50%', height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={80}
                                    fill={chartLineColor}
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieChartFillColors[index % pieChartFillColors.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
